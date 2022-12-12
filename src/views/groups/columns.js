// ** React Imports
import { Link } from 'react-router-dom'


// ** Icons Imports
import { User, Settings, Edit2, Eye } from 'react-feather'
// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Vars
const renderRole = row => {
  const roleObj = {
    Student: {
      class: 'text-primary',
      icon: User
    },
    Owner: {
      class: 'text-info',
      icon: Edit2
    },
    Author: {
      class: 'text-warning',
      icon: Settings
    },
  }
  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

export const columns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '350px',
    cell: ({ name }) => name,
    selector: row => row.name
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'Role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'Created Date',
    selector: row => row.createdDate,
    cell: ({ createdDate }) => createdDate,
    sortFunction: (rowA, rowB) => {
      return new Date(rowB.createdDate) - new Date(rowA.createdDate)
    }
  }
]
