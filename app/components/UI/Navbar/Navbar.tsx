'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { useAuthContext } from '../../../context/AuthContext';
import logout from '../../../firebase/auth/signout';

export default function NavBar() {
  const user = useAuthContext();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error('Error: cannot logout');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            className="d-inline-block align-top"
            src="\app-logo.svg"
            alt="Logo"
            width={30}
            height={30}
          />
          Sports Booking App
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/signin">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/admin">Test logged user</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/signup">Sign up</Link>
            </li>
          </ul>
          {user ? (
            <>
              <span className="navbar-text">
                {user.email}
              </span>
              <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : 'no login'}
        </div>
      </div>
    </nav>
  );
}
