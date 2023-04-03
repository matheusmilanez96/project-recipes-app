import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveUserLocal from '../helpers/handleLocalStorage';
import { saveUserGlobal } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },

      () => {
        if (this.validateEmailAndPassword()) {
          this.setState({
            isButtonDisabled: false,
          });
        } else {
          this.setState({
            isButtonDisabled: true,
          });
        }
      },
    );
  };

  validateEmailAndPassword = () => {
    const { email, password } = this.state;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const six = 6;

    const validation = (emailRegex.test(email) && password.length > six);

    return validation;
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const { history, dispatch } = this.props;
    return (
      <div>
        <div>
          Trybewallet
        </div>

        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(saveUserGlobal(this.state));
            saveUserLocal(email);
            history.push('/meals');
            console.log('Ao clicar, envie a informação do formulário');
          } }
        >

          <div>
            Sign in
          </div>

          <fieldset>
            <input
              type="text"
              name="email"
              value={ email }
              placeholder="email"
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </fieldset>

          <fieldset>
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </fieldset>

          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="login-submit-btn"
          >
            {' '}
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  password: state.user.password,
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
