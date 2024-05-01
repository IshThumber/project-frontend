import React from 'react'
import { FormControl, Input } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'


const NewEntryForm = ({ handleFormSubmit, handleFormChange, formErrors, isNewOpen, onNewOpen, onNewClose }) => {

  return (
    <>
      <div className='font-sans text-black'>

        <Button onClick={onNewOpen} bg={"blue"}>Open Modal</Button>

        <Modal isOpen={isNewOpen} onClose={onNewClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Entry Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className='flex flex-col p-4 gap-9'>
                <FormControl>
                  <Input
                    isInvalid={formErrors.name}
                    name="name"
                    type="text"
                    pr="4.5rem"
                    variant="outline"
                    placeholder="Enter Name"
                    onChange={handleFormChange}
                  />
                  {formErrors.name && <span className='text-red-500'>{formErrors.name}</span>}
                </FormControl>
                <FormControl>
                  <Input
                    isInvalid={formErrors.phoneNumber}
                    name="phoneNumber"
                    type="number"
                    pr="4.5rem"
                    variant="outline"
                    placeholder="Enter Phone Number"
                    onChange={handleFormChange}
                  />
                  {formErrors.phoneNumber && <span className='text-red-500'>{formErrors.phoneNumber}</span>}
                </FormControl>
                <FormControl>
                  <Input
                    isInvalid={formErrors.email}
                    name="email"
                    type="text"
                    pr="4.5rem"
                    variant="outline"
                    placeholder="Enter Email"
                    onChange={handleFormChange}
                  />
                  {formErrors.email && <span className='text-red-500'>{formErrors.email}</span>}
                </FormControl>
                <FormControl>
                  <Input
                    isInvalid={formErrors.hobbies}
                    name="hobbies"
                    type="text"
                    pr="4.5rem"
                    variant="outline"
                    placeholder="Enter Hobbies"
                    onChange={handleFormChange}
                  />
                  {formErrors.hobbies && <span className='text-red-500'>{formErrors.hobbies}</span>}
                </FormControl>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onNewClose}>
                Close
              </Button>
              <Button variant='ghost' className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700" onClick={handleFormSubmit}>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </div>

    </>
  );
}

export default NewEntryForm