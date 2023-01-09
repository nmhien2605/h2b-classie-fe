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
  const [userData, setUserData] = useState(null);

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserData(user);
      console.log(user);
    }
  }, [])

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Account Settings' />
      {userData !== null ? (
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent userData={userData} />
              </TabPane>
              <TabPane tabId='2'>
                <SecurityTabContent />
              </TabPane>
              <TabPane tabId='3'>
                <ConnectionsTabContent userData={userData} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
