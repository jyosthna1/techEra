import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseDetails: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  getFormattedData = data => ({
    description: data.description,
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
  })

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.course_details)
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {courseDetails} = this.state
    return (
      <div className="course-card-container">
        <img
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
          className="logo-image-card"
        />
        <div className="course-info">
          <h1 className="name">{courseDetails.name}</h1>
          <p className="description">{courseDetails.description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-view"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCourseDetails}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="courseCard">{this.renderCourseDetails()}</div>
      </>
    )
  }
}

export default CourseItemDetails
