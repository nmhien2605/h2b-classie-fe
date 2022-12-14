// ** React Imports
import { useEffect, Fragment } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Reactstrap Imports
import {
  Alert,
  Row,
  Col,
  Label,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap";

// ** Store & Actions

// ** Third party Components

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { Controller } from "react-hook-form";
import { ChevronDown, Edit, Trash } from "react-feather";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const CustomHeader = ({ addMember }) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 permission-header">
      <Col xs={12} lg={4} className="d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
          <label htmlFor="rows-per-page">Group name</label>
        </div>
      </Col>
      <Col xs={12} lg={8}>
        <div className="d-flex align-items-center justify-content-lg-end justify-content-start flex-md-nowrap flex-wrap mt-lg-0 mt-1">
          <Button
            className="add-permission mt-sm-0 mt-1"
            color="primary"
            onClick={addMember()}
          >
            Add Member
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const fakeData = [
  {
    id: 1,
    name: "Hao Tran",
    role: "Owner",
    createdDate: "14 Apr 2021, 8:43 PM",
  },
  {
    id: 2,
    role: "Student",
    name: "Hien Nguyen",
    createdDate: "16 Sep 2021, 5:20 PM",
  },
  {
    id: 3,
    name: "Le Bach",
    createdDate: "14 Oct 2021, 10:20 AM",
    role: "Student",
  },
];

const Table = () => {
  // ** Store Vars & Hooks

  const addMember = () => {
    console.log("add member here:");
  };
  const currentPage = 1;
  const rowsPerPage = 10;

  // ** Get data on mount
  useEffect(() => {}, []);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(9 / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render

  const handleEditClick = async (row) => {
    const { value } = await MySwal.fire({
      title: `Which role would you like to set for ${row.name}?`,
      input: "select",
      inputOptions: {
        owner: "Owner",
        coowner: "Co-owner",
        member: "Regular member",
      },
      padding: "30px",
      width: "500px",
      inputValue: "",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
    });

    // goi api update quyen user o day
    console.log({ value });
  };

  const onDelete = async (row) => {
    const result = await MySwal.fire({
      title: `Are you sure to delete ${row.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete this member!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    });

    if (result.value) {
      // Goi api xoa user o day
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "Cancelled",
        text: "Your presentation is safe :)",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const updatedColumns = [
    ...columns,
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center permissions-actions">
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => handleEditClick(row)}
            >
              <Edit className="font-medium-2" />
            </Button>
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => onDelete(row)}
            >
              <Trash className="font-medium-2" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={updatedColumns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={fakeData}
          subHeaderComponent={<CustomHeader addMember={addMember} />}
        />
      </div>
    </Fragment>
  );
};

export default Table;
