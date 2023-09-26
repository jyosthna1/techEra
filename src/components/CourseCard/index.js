import './index.css'
import {Link} from 'react-router-dom'

const CourseCard = props => {
  const {details} = props
  const {id, logoUrl, name} = details

  return (
    <li className="course-item">
      <Link to={`/courses/${id}`} className="link-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseCard
