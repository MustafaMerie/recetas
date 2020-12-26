import React, { useContext } from "react";
import "./style.css";
import { Container, Modal } from "react-bootstrap";
import SingInUserIcon from "../assets/signInUser.svg";
import { AuthContext } from "../StateStore/AuthProvider";

export default function SignInModal(props) {
    const {
        signInHandler,
        email,
        setEmail,
        password,
        setPassword,
        setModalShow,
        setModalUpShow,
    } = useContext(AuthContext);

    const handleModalChange = () => {
        setModalShow(false);
        setModalUpShow(true);
    };

    return (
        <Container>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <img src={SingInUserIcon} alt="sign in icon" />
                    <p className="my-3 h3">Welcome Back!</p>
                    <form onSubmit={signInHandler}>
                        <input
                            type="email"
                            name="email"
                            className="form-control my-4"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Sign In"
                            className="form-control mt-4 primaryButton"
                        />
                    </form>
                    <p className="text-right mt-1">
                        Don’t have an account?
            <button className="changeModalBtn" onClick={handleModalChange}>
                            Sign Up
            </button>
                    </p>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
