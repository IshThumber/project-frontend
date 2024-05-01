import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input
} from '@chakra-ui/react'

export function TableSelection({ data, handleDelete, handleUpdate, handleCheckboxChange, handleSelectAllChange, selectAll, selectedCheckboxes, isEditOpen, onEditOpen, onEditClose }) {
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    setEditedItem({});
  }, [data]);

  const handleEdit = (item) => {
    setEditedItem({ ...item });
    onEditOpen();
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    let body = { name: editedItem.name, phoneNumber: editedItem.phoneNumber, email: editedItem.email, hobbies: editedItem.hobbies }
    handleUpdate(editedItem.id, body);
    onEditClose();
    window.location.reload();
  };

  const UpdateForm = () => {
    return (
      <>
        <div className="flex flex-col gap-6 p-4">
          <Input
            name="name"
            type="text"
            pr="4.5rem"
            variant="outline"
            placeholder="Enter Name"
            defaultValue={editedItem.name}
            onChange={(e) => handleUpdateFormChange(e)}
          />
          <Input
            name="phoneNumber"
            type="number"
            pr="4.5rem"
            variant="outline"
            placeholder="Enter Phone Number"
            defaultValue={editedItem.phoneNumber}
            onChange={handleUpdateFormChange}
          />
          <Input
            name="email"
            type="text"
            pr="4.5rem"
            variant="outline"
            placeholder="Enter Email"
            defaultValue={editedItem.email}
            onChange={handleUpdateFormChange}
          />
          <Input
            name="hobbies"
            type="text"
            pr="4.5rem"
            variant="outline"
            placeholder="Enter Hobbies"
            defaultValue={editedItem.hobbies}
            onChange={handleUpdateFormChange}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Entry Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateForm />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onEditClose}>
                Close
              </Button>
              <Button variant='ghost' className="px-4 py-2 font-bold text-white bg-green-300 rounded-full hover:bg-green-700" onClick={handleUpdateSubmit}>Update</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

      <div className="w-full p-3 border-2 border-blue-gray-900  rounded-xl text-black">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={selectAll}
                />
              </th>
              <th className=" px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Hobbies</th>
              <th className="px-4 py-2" colSpan={2}>Actions</th>
            </tr>
          </thead>
          {data.length === 0 ? (
            <tbody>
              <tr key={0}>
                <td colSpan="7" className="text-center p-5">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                      checked={selectedCheckboxes.includes(item.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.phoneNumber}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.hobbies}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
