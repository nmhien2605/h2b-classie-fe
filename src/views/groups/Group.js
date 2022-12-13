// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card } from 'reactstrap'
import Table from './Table'

// ** Table Import


const Group = () => {
  return (
    <Fragment>
      <h3>Group List</h3>
      <p>Each category (Basic, Professional, and Business) includes the four predefined roles shown below.</p>
      <Card>
        <div className='card-datatable app-user-list table-responsive'>
          <Table />
        </div>
      </Card>
    </Fragment>
  )
}

export default Group
