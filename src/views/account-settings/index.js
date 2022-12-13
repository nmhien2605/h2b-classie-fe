// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'

import AccountTabContent from './AccountTabContent'
import SecurityTabContent from './SecurityTabContent'
import ConnectionsTabContent from './ConnectionsTabContent'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState(null)

  const fakeData = {
    general: {
      avatar: "/static/media/avatar-s-11.1d46cc62.jpg",
      username: "johndoe",
      fullName: "John Doe",
      email: "granger007@hogward.com",
      company: "PIXINVENT"
    },
    info: {
      bio: "",
      dob: null,
      country: "USA",
      website: "",
      phone: 6562542568
    },
    social: {
      socialLinks: {
        twitter: "https://www.twitter.com",
        facebook: "",
        google: "",
        linkedIn: "https://www.linkedin.com",
        instagram: "",
        quora: ""
      },
      connections: {
        twitter: {
          profileImg: "/static/media/11-small.5c61c575.png",
          id: "johndoe"
        },
        google: {
          profileImg: "/static/media/3-small.8d6585e8.png",
          id: "luraweber"
        },
        facebook: {},
        github: {}
      }
    },
    notification: {
      commentOnArticle: true,
      answerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false
    }
  }

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    setData(fakeData)
  }, [])

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Account Settings' breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent data={data.general} />
              </TabPane>
              <TabPane tabId='2'>
                <SecurityTabContent />
              </TabPane>
              <TabPane tabId='3'>
                <ConnectionsTabContent />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
