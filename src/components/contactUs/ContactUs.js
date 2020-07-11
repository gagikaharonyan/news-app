import React from 'react';
import './ContactUs.css';

export default class ContacAS extends React.Component {
    state = {
        name: '',
        message: '',
        email: '',
        submittingState: 'unsubmitted'
    }

    componentDidMount() {
        document.body.classList = 'fixed-position';
    }

    componentWillUnmount() {
        document.body.classList = '';
    }

    handleInput = (evn) => {
        this.setState({[evn.target.name] : evn.target.value,
                            submittingState: 'unsubmitted'});
    }

    onSubmit = (evn) => {
        evn.preventDefault();
        this.setState({submittingState: 'submitting'}, () => {
            setTimeout(() => {this.setState({submittingState: 'submitted'})}, 1500)
        });
    }

    render() {
        const {submittingState} = this.state;

        return (
            <div className="muted-wrapper full-muted" onClick={(evn) => {
                if(evn.target.className === 'muted-wrapper full-muted') {
                    this.props.onClose();
                }
            }}>
                <div className="Contact-us" onClick={() => {}}>  
                    <div className="contact-us-header">
                        <span className="contact-us-title">Contact Us</span>
                        <i className="fas fa-times contact-us-close-btn" onClick={this.props.onClose}></i>
                    </div>                  
                    <form className="contact-us-form" onSubmit={this.onSubmit}>
                        <input type="text" name="name" placeholder="Name"
                            onChange={this.handleInput}
                            value={this.state.name} maxLength="20" required>
                        </input>
                        <textarea type="text" name="message" placeholder="Message"
                            onChange={this.handleInput}
                            value={this.state.message}  maxLength="500" required>
                        </textarea>
                        <input type="email" name="email" placeholder="E-Mail"
                            onChange={this.handleInput}
                            value={this.state.email} maxLength="20" required>
                        </input>
                        <button type="submit" className={submittingState}>{submittingState === 'submitted' ? 'Submitted' : 'Submit'}</button>
                    </form>
                </div>
            </div>  
        );
    }
}