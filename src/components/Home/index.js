import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseCard from '../CourseCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseList: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        logoUrl: eachCourse.logo_url,
        id: eachCourse.id,
        name: eachCourse.name,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="course-un-order-container">
          {courseList.map(eachCourse => (
            <CourseCard details={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-container">{this.renderCourseDetails()}</div>
      </>
    )
  }
}

export default Home
