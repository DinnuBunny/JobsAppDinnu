import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterComponent = props => {
  const {onCheckEmploymentType, onCheckSalaryRange} = props

  const employmentEvent = event => {
    onCheckEmploymentType(event)
  }

  const salaryEvent = event => {
    onCheckSalaryRange(event)
  }

  return (
    <>
      <hr className="hr-line" />
      <ul className="employment-filter">
        <h1 className="filter-heading">Type of Employment</h1>
        {employmentTypesList.map(eachFilter => (
          <div className="filter-card" key={eachFilter.employmentTypeId}>
            <input
              type="checkbox"
              id={eachFilter.employmentTypeId}
              value={eachFilter.employmentTypeId}
              className="checkbox-input"
              onChange={employmentEvent}
            />
            <label htmlFor={eachFilter.employmentTypeId} className="label">
              {eachFilter.label}
            </label>
          </div>
        ))}
      </ul>
      <hr className="hr-line" />
      <ul className="employment-filter">
        <h1 className="filter-heading">Salary Range</h1>
        {salaryRangesList.map(eachFilter => (
          <div className="filter-card" key={eachFilter.salaryRangeId}>
            <input
              type="radio"
              id={eachFilter.salaryRangeId}
              name="salary"
              value={eachFilter.salaryRangeId}
              className="checkbox-input"
              onChange={salaryEvent}
            />
            <label htmlFor={eachFilter.salaryRangeId} className="label">
              {eachFilter.label}
            </label>
          </div>
        ))}
      </ul>
    </>
  )
}

export default FilterComponent
