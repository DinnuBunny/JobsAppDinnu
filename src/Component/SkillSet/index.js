import './index.css'

const SkillSet = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill

  return (
    <li className="skill-list">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillSet
