import React, { useContext } from "react";
import "./style.css";
import { Container, Modal } from "react-bootstrap";
import SingUpUserIcon from "../assets/new-user.svg";
import { AuthContext } from "../StateStore/AuthProvider";

export default function SignInModal(props) {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        signUpHandler,
        setModalShow,
        setModalUpShow,
    } = useContext(AuthContext);

    const handleModalChange = () => {
        setModalUpShow(false);
        setModalShow(true);
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
                    <img src={SingUpUserIcon} alt="sign in icon" />
                    <p className="my-3 lead">
                        Creating an account enables you to add your recipes. it’s free.
                    </p>
                    <form onSubmit={signUpHandler}>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            value="Sign Up"
                            className="form-control mt-4 primaryButton"
                        />
                    </form>
                    <p className="text-right mt-1">
                        Already have an account?
                        <button className="changeModalBtn" onClick={handleModalChange}>Sign in</button>
                    </p>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
