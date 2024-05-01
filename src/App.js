import { Button, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NewEntryForm from './components/NewEntryForm';
import { TableSelection } from './components/Table';

// const hostURL = "https://the-it-backend.onrender.com";
const hostURL = process.env.REACT_APP_HOST_URL

const App = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  // const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  // const [updateFormData, setUpdateFormData] = useState({});

  useEffect(() => {
    axios.get(`${hostURL}/api/alldata`)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const validationForm = () => {
    let error = {};
    let flag = true;

    if (!formData.name) {
      flag = false;
      error.name = "Please enter your name";
    } else if (!/^[A-Za-z ]+$/.test(formData.name.toLowerCase().trim())) {
      error.name = "Please enter a valid name";
      flag = false;
    } else {
      error.name = "";
    }

    if (!formData.phoneNumber?.trim()) {
      error.phoneNumber = "Mobile number is required";
      flag = false;
    } else if (formData.phoneNumber.length !== 10) {
      error.phoneNumber = "Length must be 10 digits";
      flag = false;
    } else if (
      !/^[6-9][0-9]{9}$/.test(formData.phoneNumber) ||
      ["6666666666", "7777777777", "8888888888", "9999999999"].includes(formData.phoneNumber)
    ) {
      error.phoneNumber = "Invalid mobile number";
      flag = false;
    } else {
      error.phoneNumber = "";
    }

    if (!formData.email) {
      error.email = "Please enter your email";
      flag = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(formData.email)) {
      error.email = "Please enter a valid email";
      flag = false;
    } else {
      error.email = "";
    }

    if (!formData.hobbies) {
      error.hobbies = "Please enter your hobbies";
      flag = false;
    } else {
      error.hobbies = "";
    }

    setFormErrors(error);
  };

  const handleFormChange = (e) => {
    validationForm();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    validationForm();
    if (formData.name && formData.phoneNumber && formData.email && formData.hobbies) {
      axios.post(`${hostURL}/api/newdata`, formData)
        .then(response => setData([...data, response.data]))
        .catch(error => console.error(error));
    } else {
      alert("Please fill the form");
    }
    onNewClose();

    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      hobbies: '',
    });
  };

  const handleDelete = (id) => {
    axios.post(`${hostURL}/api/delete/data/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => setData(data.filter(item => item.id !== id)))
      .catch(error => console.error(error));
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((checkboxId) => checkboxId !== id));
    }
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelectedCheckboxes(allIds);
    } else {
      setSelectedCheckboxes([]);
    }
  };

  const handleUpdate = async (itemId, updatedData) => {
    await axios.put(`${hostURL}/api/update/data/${itemId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => setFormData(response.data))
      .catch(error => console.error(error));
    // setIsUpdateFormOpen(false);
  };

  // const handleMail = async () => {
  //   let ids = selectedCheckboxes;
  //   if (ids.length === 0) {
  //     alert('Please select at least one checkbox');
  //     return;
  //   }
  //   for (let i = 0; i < ids.length; i++) {
  //     try {
  //       await axios.post(`${hostURL}/api/sendmail/${ids[i]}`, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //         .then(response => response)
  //         .catch(error => console.error(error));

  //       alert("Mail sent successfully")
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleTrunc = async () => {
    try {
      await axios.post(`${hostURL}/api/trunc`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Table truncated successfully.');

      axios.get(`${hostURL}/api/alldata`)
        .then(response => setData(response.data))
        .catch(error => console.error(error));

    } catch (error) {
      console.error('Error truncating table:', error);
    }
  };

  const handleMultiDelete = async () => {
    let ids = selectedCheckboxes;
    if (ids.length === 0) {
      alert('Please select at least one checkbox');
      return;
    }
    for (let i = 0; i < ids.length; i++) {
      try {
        await axios.post(`${hostURL}/api/delete/data/${ids[i]}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response)
          .catch(error => console.error(error));

      } catch (error) {
        console.error(error);
      }
    }
    alert(`${ids.length} deleted successfully!`)
    window.location.reload();
  }

  const heading = data.length === 1 ? `${data.length} entry` : `${data.length} entries`
  return (
    <div className='w-full bg-slate-100'>
      <div className='bg-trasnparent text-black flex flex-col gap-14 w-4/5 m-auto'>
        <div className='w-full bg-green-50 p-5 font-extrabold text-4xl'>
          CRUDSify

          <p className='text-xl mt-4'>
            CRUDSify is a powerful data management application that simplifies CRUD operations (Create, Read, Update, Delete) with an intuitive user interface, seamless integration between frontend and backend, and email features, ensuring efficient and secure data handling.</p>
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Form</h1>
          <NewEntryForm
            setFormData={setFormData}
            formData={formData}
            handleFormSubmit={handleFormSubmit}
            open={open}
            setOpen={setOpen}
            handleFormChange={handleFormChange}
            formErrors={formErrors}
            isNewOpen={isNewOpen}
            onNewOpen={onNewOpen}
            onNewClose={onNewClose}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Table Selection ({heading})</h1>
          <TableSelection
            data={data}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
            selectAll={selectAll}
            selectedCheckboxes={selectedCheckboxes}
            isEditOpen={isEditOpen}
            onEditOpen={onEditOpen}
            onEditClose={onEditClose}
          />
        </div>

        <div className='flex flex-row gap-8 mb-10'>
          {/* <Button
            variant='ghost'
            className="px-4 py-2 font-bold text-black bg-green-200 rounded-full hover:bg-green-700"
            onClick={handleMail}
          >
            Send Mail
          </Button> */}

          <Button
            variant='ghost'
            className="px-4 py-2 font-bold text-black bg-red-200 rounded-full hover:bg-red-700"
            onClick={handleMultiDelete}
          >
            Delete Selected ({`${selectedCheckboxes.length}`})
          </Button>

          <Button
            variant='ghost'
            className="px-4 py-2 font-bold text-black bg-yellow-200 rounded-full hover:bg-yellow-700"
            onClick={handleTrunc}
          >
            Truncate Table
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
