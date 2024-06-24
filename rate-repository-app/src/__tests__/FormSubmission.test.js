/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SigninForm } from '../components/SignIn';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        render(<SigninForm onSubmit={onSubmit}/>);
        fireEvent.changeText(screen.getByPlaceholderText('username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
        fireEvent.press(screen.getByText('Sign in'));
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        console.log(onSubmit.mock.calls[0][0])
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password'
        });
      });
    });
  });
});