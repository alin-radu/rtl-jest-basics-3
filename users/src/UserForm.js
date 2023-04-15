import { useState } from 'react';

function UserForm({ onUserAdd }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onUserAdd({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <br />
      <div>
        <label htmlFor="email">Enter Email: </label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <br />
      <button>Add User</button>
      <br />
      <br />
    </form>
  );
}

export default UserForm;
