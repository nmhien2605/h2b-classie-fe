
/*eslint eqeqeq:0*/
/*eslint-disable */
// ** React Imports
import { useEffect, Fragment, useState } from "react";
import axiosHeader from "../../constants/axiosHeader"
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
import axios from "axios";
import { useHistory } from "react-router-dom";
const MySwal = withReactContent(Swal);

const CustomHeader = ({ addMember }) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 permission-header">
      <Col xs={12} lg={4} className="d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
          <label htmlFor="rows-per-page">Group detail</label>
        </div>
      </Col>
      <Col xs={12} lg={8}>
        <div className="d-flex align-items-center justify-content-lg-end justify-content-start flex-md-nowrap flex-wrap mt-lg-0 mt-1">
          <Button
            className="add-permission mt-sm-0 mt-1"
            color="primary"
            onClick={addMember}
          >
            Add Member
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const Table = ({ groupData }) => {
  const searchParams = new URLSearchParams(document.location.search);
  const history = useHistory();
  const [canEdit, setCanEdit] = useState(false);

  // ** Store Vars & Hooks
  const currentPage = 1;
  const rowsPerPage = 10;

  // ** Get data on mount
  useEffect(() => { }, []);

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

  const addMember = async () => {
    const { value, isDismissed } = await MySwal.fire({
      title: `Add new member`,
      input: "text",
      inputPlaceholder: "Enter their email address",
      padding: "30px",
      width: "500px",
      inputValue: "",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
    });

    if (isDismissed) return;

    const groupId = searchParams.get("id");

    const data = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/groups/invite`,
      { groupId, emails: [value] },
      { headers: axiosHeader },
      {
        withCredentials: true,
      }
    );
    history.go(0);
  };

  const handleEditClick = async (row) => {
    const { value, isDismissed } = await MySwal.fire({
      title: `Which role would you like to set for ${row.name}?`,
      input: "select",
      inputOptions: {
        "co-owner": "Co-owner",
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

    if (isDismissed) return;

    // goi api update quyen user o day

    const groupId = searchParams.get("id");

    const data = await axios.put(
      `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}/update-member/${row.detail._id}`,
      { role: value },
      { headers: axiosHeader },
      {
        withCredentials: true,
      }
    );

    history.go(0);
  };

  const onDelete = async (row) => {
    console.log({ row });

    const result = await MySwal.fire({
      title: `Are you sure to delete ${row.detail.name}?`,
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
      const groupId = searchParams.get("id");

      // Goi api xoa user o day
      const data = await axios.delete(
        `${process.env.REACT_APP_API_DOMAIN}/groups/${groupId}/remove-member/${row.detail._id}`,
        { headers: axiosHeader },
        {
          withCredentials: true,
        }
      );
      history.go(0);
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "Cancelled",
        text: "Your member is still in this group :)",
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

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("user"));

    const user = groupData?.members?.find(
      (member) => member.detail._id === userDetail._id
    );

    setCanEdit(user?.role === "owner" || user?.role === "co-owner");
  }, [groupData]);

  return (
    <Fragment>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={canEdit ? updatedColumns : columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={groupData.members}
          subHeaderComponent={<CustomHeader addMember={addMember} />}
        />
      </div>
    </Fragment>
  );
};

export default Table;
