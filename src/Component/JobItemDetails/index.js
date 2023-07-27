// JobItemDetails
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SkillSet from '../SkillSet'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], apiStatus: apiConsts.initial}

  componentDidMount() {
    this.getTheJobItemDetailsData()
  }

  onSuccessfulApi = data => {
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs
    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebSiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
    }

    const updatedSimilarJobs = similarJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      jobDetails: {...updatedJobDetails},
      similarJobs: updatedSimilarJobs,
      apiStatus: apiConsts.success,
    })
  }

  getTheJobItemDetailsData = async () => {
    this.setState({apiStatus: apiConsts.loading})
    const token = Cookie.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfulApi(data)
    } else {
      this.setState({apiStatus: apiConsts.failure})
    }
  }

  renderJobItemSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(similarJobs)

    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobDetails
    return (
      <>
        <div className="job-details-card">
          <div className="logo-title-rating-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-company-logo"
            />
            <div className="title-rating-card">
              <h1 className="job-card-title">{title}</h1>
              <div className="rating-card">
                <AiFillStar className="star-icon" />
                <p className="rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-card">
            <div className="location-type-card">
              <div className="l-t-card">
                <ImLocation className="l-t-icon" />
                <p className="l-t-para">{location}</p>
              </div>
              <div className="l-t-card">
                <BsFillBriefcaseFill className="l-t-icon" />
                <p className="l-t-para">{employmentType}</p>
              </div>
            </div>
            <p className="package-para">{packagePerAnnum}</p>
          </div>
          <hr className="job-card-line" />
          <div className="description-company-link">
            <h1 className="description-head">Description</h1>
            <a
              href={companyWebSiteUrl}
              rel="noreferrer"
              target="_blank"
              className="anchor-link"
            >
              Visit <FiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-head">Skills</h1>
            <ul className="skills-un-ordered-list">
              {skills.map(eachSkill => (
                <SkillSet key={eachSkill.name} eachSkill={eachSkill} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-card">
            <div className="life-at-company-head-para">
              <h1 className="skills-head">Life at Company</h1>
              <p className="life-at-company-para">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-job-un-ordered-list">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItemDetailsLoadingView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryJobsData = () => {
    this.getTheJobItemDetailsData()
  }

  renderJobItemDetailsFailureView = () => (
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

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="all-job-details-container">
          {apiStatus === apiConsts.success && this.renderJobItemSuccessView()}
          {apiStatus === apiConsts.loading &&
            this.renderJobItemDetailsLoadingView()}
          {apiStatus === apiConsts.failure &&
            this.renderJobItemDetailsFailureView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
