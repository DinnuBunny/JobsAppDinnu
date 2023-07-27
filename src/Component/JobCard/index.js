// JobCard
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobDetails
  return (
    <li className="job-item-list">
      <Link to={`/jobs/${id}`} className="link">
        <div className="logo-title-rating-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-company-logo"
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
      </Link>
      <hr className="job-card-line" />
      <h1 className="description-head">Description</h1>
      <p className="description">{jobDescription}</p>
    </li>
  )
}

export default JobCard
