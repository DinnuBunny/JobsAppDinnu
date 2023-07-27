import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobs = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <li className="similar-job-details-card">
      <Link to={`/jobs/${id}`} className="link">
        <div className="logo-title-rating-card">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-jobs-company-logo"
          />
          <div className="title-rating-card">
            <h1 className="similar-jobs-card-title">{title}</h1>
            <div className="rating-card">
              <AiFillStar className="star-icon" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
      </Link>
      <h1 className="description-head">Description</h1>
      <p className="description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
