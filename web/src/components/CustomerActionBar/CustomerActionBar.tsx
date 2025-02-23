import { Button, Tooltip } from "@mantine/core";
import React from "react";
import { modals } from "@mantine/modals";
import { Modals } from "../../container/modals/Fmodals";
import CustomerModal from "../../container/modals/CustomerModal/CustomerModal";
import Edit from "../../assets/icons/edit";
import { useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";

interface IProps {
  status: boolean;
  id: string;
}

const CustomerActionBar: React.FC<IProps> = ({ status: _, id }) => {
  const navigate = useNavigate();

  const handleOpenEditModal = () => {
    Modals({
      children: <CustomerModal isCreateModal={false} id={id} />,
      title: `Edit Customer`,
      size: "sm",
    });
  };

  return (
    <Button.Group>
      <>
        <Tooltip label="Edit">
          <Button
            variant="default"
            size="compact-md"
            onClick={() => {
              modals.closeAll();
              handleOpenEditModal();
            }}
          >
            <Edit />
          </Button>
        </Tooltip>
        <Tooltip label="Customer Details">
          <Button
            variant="default"
            size="compact-md"
            onClick={async () => navigate(`/customer/details?id=${id}`)}
          >
            <IconBook />
          </Button>
        </Tooltip>
      </>
    </Button.Group>
  );
};

export default CustomerActionBar;
