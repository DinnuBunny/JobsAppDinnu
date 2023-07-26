// Jobs
import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import ProfileComponent from '../ProfileComponent'
import FilterComponent from '../FilterComponent'
import JobCard from '../JobCard'
import './index.css'

const apiConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  noDataFound: 'NODATAFOUND',
}

const initialFilter = {
  employmentTypeList: [],
  minimumPackage: '',
  search: '',
}

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    filter: {...initialFilter},
    apiJobStatus: apiConsts.initial,
    apiProfileStatus: apiConsts.initial,
  }

  componentDidMount() {
    this.getTheProfileData()
    this.getTheJobsData()
  }

  onSuccessJobsApi = data => {
    const updatedJobsList = data.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({jobsList: updatedJobsList, apiJobStatus: apiConsts.success})
  }

  getTheJobsData = async () => {
    this.setState({apiJobStatus: apiConsts.loading})
    const {filter} = this.state
    const token = this.getTheJWTToken()
    const {employmentTypeList, minimumPackage, search} = filter
    const employmentType = employmentTypeList.join(',')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessJobsApi(data.jobs)
    } else {
      this.setState({apiJobStatus: apiConsts.failure})
    }
  }

  onSuccessProfileApi = data => {
    const updatedProfileData = {
      name: data.name,
      profileImageUrl: data.profile_image_url,
      shortBio: data.short_bio,
    }
    this.setState({
      profileData: {...updatedProfileData},
      apiProfileStatus: apiConsts.success,
    })
  }

  getTheProfileData = async () => {
    this.setState({apiProfileStatus: apiConsts.loading})
    const token = this.getTheJWTToken()
    const profileApi = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileApi, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessProfileApi(data.profile_details)
    } else {
      this.setState({apiProfileStatus: apiConsts.failure})
    }
  }

  getTheJWTToken = () => {
    const token = Cookie.get('jwt_token')
    return token
  }

  onClickSearch = event => {
    event.preventDefault()
    this.getTheJobsData()
  }

  onCheckEmploymentType = event => {
    const {filter} = this.state
    let {employmentTypeList} = filter
    const employmentTypeInput = event.target.value
    const check = event.target.checked

    if (check) {
      employmentTypeList.push(employmentTypeInput)
      this.setState(
        prevState => ({
          filter: {...prevState.filter, employmentTypeList},
        }),
        this.getTheJobsData,
      )
    } else {
      employmentTypeList = employmentTypeList.filter(
        eachId => eachId !== employmentTypeInput,
      )
      this.setState(
        prevState => ({
          filter: {...prevState.filter, employmentTypeList},
        }),
        this.getTheJobsData,
      )
    }
  }

  onCheckSalaryRange = event => {
    const salaryInput = event.target.value
    const minPackage = {
      minimumPackage: salaryInput,
    }
    this.setState(
      prevState => ({filter: {...prevState.filter, ...minPackage}}),
      this.getTheJobsData,
    )
  }

  onEnterSearchText = event => {
    const searchInput = event.target.value
    const searchText = {
      search: searchInput,
    }
    this.setState(prevState => ({filter: {...prevState.filter, ...searchText}}))
  }

  renderProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryProfileData = () => {
    this.getTheProfileData()
  }

  renderProfileFailedView = () => (
    <div className="loader-container">
      <button
        type="button"
        className="header-logout-btn"
        onClick={this.onRetryProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    return <ProfileComponent profileData={profileData} />
  }

  renderJobCardSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-un-ordered-list">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobCardLoadingView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryJobsData = () => {
    this.getTheJobsData()
  }

  renderJobCardFailureView = () => (
    <div className="failed-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failed-image"
      />
      <h1 className="failed-heading">Oops! Something Went Wrong</h1>
      <p className="failed-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="header-logout-btn"
        onClick={this.onRetryJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderJobCardNoDataView = () => (
    <div className="failed-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failed-image"
      />
      <h1 className="failed-heading">No Jobs Found</h1>
      <p className="failed-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  getTheListOfJobs = () => {
    let {apiJobStatus} = this.state
    const {jobsList} = this.state
    if (apiJobStatus === apiConsts.success && jobsList.length === 0) {
      apiJobStatus = apiConsts.noDataFound
    }

    switch (apiJobStatus) {
      case apiConsts.loading:
        return this.renderJobCardLoadingView()
      case apiConsts.success:
        return this.renderJobCardSuccessView()
      case apiConsts.failure:
        return this.renderJobCardFailureView()
      case apiConsts.noDataFound:
        return this.renderJobCardNoDataView()
      default:
        return null
    }
  }

  render() {
    const {apiProfileStatus} = this.state
    const jobsListView = this.getTheListOfJobs()
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            {apiProfileStatus === apiConsts.loading &&
              this.renderProfileLoadingView()}
            {apiProfileStatus === apiConsts.failure &&
              this.renderProfileFailedView()}
            {apiProfileStatus === apiConsts.success &&
              this.renderProfileSuccessView()}
            <FilterComponent
              onCheckEmploymentType={this.onCheckEmploymentType}
              onCheckSalaryRange={this.onCheckSalaryRange}
            />
          </div>

          <div className="jobs-search-container">
            <form className="search-container" onSubmit={this.onClickSearch}>
              <input
                type="search"
                className="search-input"
                onChange={this.onEnterSearchText}
                placeholder="Search"
              />
              <button
                type="button"
                className="search-icon-btn"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </form>
            {jobsListView}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
