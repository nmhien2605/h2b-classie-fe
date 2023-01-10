// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, HelpCircle } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
    return (
        <Nav pills className='mb-1'>
            <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                    <User size={18} className='me-50' />
                    <span className='fw-bold'>Chat</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                    <HelpCircle size={18} className='me-50' />
                    <span className='fw-bold'>Question</span>
                </NavLink>
            </NavItem>

        </Nav>
    )
}

export default Tabs
