import { useState } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";
import { Button, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'
import { SignInWithGoogleButton } from "./signInWithGoogleButton.component";

const SignInForm = () => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        firebase
        .doSignInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
            history.go(0)
        })
        .catch((error) => {
            setError(error);
        });
    }

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });
    }

    return(
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Sign in to your account
            </Header>
            <Form size='large' onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input 
                        fluid
                        icon='mail'
                        iconPosition='left'
                        placeholder='E-mail address'
                        name="email"
                        onChange={onChange}
                    
                    />
                    <Form.Input
                        label={
                            <Link to="/">Forgot password?</Link>
                        }
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        onChange={onChange}
                    />
                    <Button.Group fluid>
                        <Button
                            color='teal'
                            size='large'
                        >
                            Sign In
                        </Button>
                        <SignInWithGoogleButton setError={setError}/>
                    </Button.Group>
                    <Divider horizontal>Or</Divider>
                    <Link to="/sign-up">Sign Up</Link>
                </Segment>
            </Form>
            { error && <Message error>{ error.message }</Message> }
        </Grid.Column>
    );
}

export {SignInForm};