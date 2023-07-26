import './index.css'

const ProfileComponent = props => {
  const {profileData} = props
  const {name, profileImageUrl, shortBio} = profileData

  return (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-short-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileComponent
