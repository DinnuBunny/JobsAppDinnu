import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoIosLogOut} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li className="header-website-logo-card">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
      </li>
      <li className="header-home-jobs-card-lg">
        <Link to="/">
          <button className="header-home-jobs-btn" type="button">
            Home
          </button>
        </Link>
        <Link to="/jobs">
          <button className="header-home-jobs-btn" type="button">
            Jobs
          </button>
        </Link>
      </li>
      <li className="header-home-jobs-card-md">
        <Link to="/">
          <button type="button" className="btn">
            <AiFillHome className="icons" />
          </button>
        </Link>
        <Link to="/jobs">
          <button type="button" className="btn">
            <BsFillBriefcaseFill className="icons" />
          </button>
        </Link>
        <button type="button" className="btn" onClick={onLogout}>
          <IoIosLogOut className="icons" />
        </button>
      </li>
      <li>
        <button className="header-logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
