// ** React Imports
import { Link } from 'react-router-dom'


// ** Icons Imports
import { User, Settings, Edit2, Eye } from 'react-feather'
// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Vars
const renderRole = row => {
  const roleObj = {
    member: {
      class: 'text-primary',
      icon: User
    },
    'co-owner': {
      class: 'text-info',
      icon: Edit2
    },
    owner: {
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
    name: "Name",
    sortable: true,
    minWidth: "350px",
    cell: ({ detail }) => detail.name,
    selector: (row) => row.detail.name,
  },
  {
    sortable: true,
    minWidth: "350px",
    name: "Email",
    selector: (row) => row.detail.email,
    cell: ({ detail }) => detail.email,
  },
  {
    sortable: true,
    minWidth: "350px",
    name: "Role",
    selector: (row) => row.role,
    cell: (row) => renderRole(row),
  },
  {
    sortable: true,
    minWidth: "350px",
    name: "Status",
    selector: (row) => row.status,
    cell: ({ status }) => {
      return status ? "Joined" : "Pending";
    },
  },
];
