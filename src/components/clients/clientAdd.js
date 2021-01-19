import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormTextArea, FormImage } from '../formFields';
import { required } from '../formFieldsValidation';
import { notify } from '../common/general';


class ClientAddForm extends Component {
    render() {
        const { className, handleSubmit, type, onAddImageLogo, onRemoveImageLogo, onAddImageBackground, onRemoveImageBackground, imageLength } = this.props;
        let maxFiles = 1;
        return (
            <form onSubmit={handleSubmit} className={`${className} client-add-form`}>
                <Field className='client-add-form__first-name' type='text' name='first_name' title='First Name' placeholder='First Name' component={FormInput} validate={[required]} />
                <Field className='client-add-form__last-name' type='text' name='last_name' title='Last Name' placeholder='Last Name' component={FormInput} validate={[required]} />
                <Field className='client-add-form__email' type='text' name='email' title='Email' placeholder='Email' component={FormInput} validate={[required]} />
                <Field className='client-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormTextArea} />
                
                <Field className='client-add-form__street-address' type='text' name='street_address' title='Street Address' placeholder='Street Address' component={FormInput} validate={[required]} />
                <Field className='client-add-form__extra-address' type='text' name='extra_address' title='Secondary' placeholder='Extra address information' component={FormInput} />
                <Field className='client-add-form__city' name='city' title='City' placeholder='City' component={FormInput} validate={[required]} />
                <Field className='client-add-form__state' type='text' name='state' title='State' placeholder='State' component={FormInput} validate={[required]} />
                <Field className='client-add-form__country' name='country' title='Country' placeholder='Country' component={FormInput} validate={[required]} />
                <Field className='client-add-form__zipcode' type='text' name='zipcode' title='Zip Code' placeholder='Zip Code' component={FormInput} validate={[required]}/>

                <Field className="client-add-form__logo" name="logo" title="Logo" onAddImage={onAddImageLogo} onRemoveImage={onRemoveImageLogo} disabled={imageLength >= 1} maxFiles={maxFiles} component={FormImage} />
                <Field className="client-add-form__background" name="background" title="Background" onAddImage={onAddImageBackground} onRemoveImage={onRemoveImageBackground} disabled={imageLength >= 1} maxFiles={maxFiles} component={FormImage} />

                <Field className='client-add-form__submit' type='submit' name='submit' title={type == "edit" ? 'Edit Client' : 'Add Client'} onClick={() => console.log('Submiting Client')} component={FormButton}/>
            </form>
        )
    }
}

class ClientAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formerr: [],
            logo: "",
            background: ""
        }
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        const { selected_client } = this.props;
        if(current_page != null)
            this.props.getClients(`${API_URL}/clients?page=${current_page}`)
        else
            this.props.getClients();

        if(selected_client != null || selected_client != undefined) {
            console.log("Goes here");
            this.props.selectSingleClientFromDB(selected_client.id);
        }
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onAddImageLogo = (file) => {
        this.setState({logo: file});
    }

    onAddImageBackground = (file) => {
        this.setState({background: file});
    }

    onRemoveImageLogo = (file) => {
        this.setState({logo: null});
    }

    onRemoveImageBackground = (file) => {
        this.setState({background: null});
    }

    uploadImage = (response, success) => {
        let logo;
        let background;
        
        if(this.state.logo)
            logo = this.state.logo;

        if(this.state.background)
            background = this.state.background;

        let imageFields = {
            id: response.data.id,
            logo: logo,
            background: background
        }

        this.props.uploadClientImage(imageFields, (response) => {
            success();
        });
    }

    onSubmit = (fields) => {
        this.props.addClient(fields, (response) => {
            this.uploadImage(response, () => {
                notify('success', 'The client has been added successfully');
                document.querySelectorAll('.modal').forEach((element) => {
                    element.classList.remove('active');
                    this.resetTable();
                    this.resetActive();
                });
            });
        });
    }

    render() {
        const { type } = this.props;
        return (
            <div className='client-add'>
                <div className='client-add__background'></div>
                <div className='client-add__content'>
                    <Heading className="client-add__content__heading">{type == "edit" ? "Edit Client" : 'Add Client'}</Heading>
                    <ClientAddForm onSubmit={(e) => this.onSubmit(e)} onAddImageLogo={this.onAddImageLogo} onAddImageBackground={this.onAddImageBackground} onRemoveImageLogo={this.onRemoveImageLogo} onRemoveImageBackground={this.onRemoveImageBackground} className='client-add__content__form' type={type} />
                </div>
            </div>
        )
    }
}

ClientAddForm = reduxForm({
    form: 'client-add',
    enableReinitialize: true
})(ClientAddForm);


ClientAddForm = connect(state => {
    const { selected_client } = state.client;
    const initialValues = (selected_client && selected_client.id) ? {
        id: selected_client.id,
        first_name: selected_client.first_name,
        last_name: selected_client.last_name,
        email: selected_client.email,
        description: selected_client.description,
        street_address: selected_client.billing_address.street_address,
        extra_address: selected_client.billing_address.extra_address,
        city: selected_client.billing_address.city,
        state: selected_client.billing_address.state,
        country: selected_client.billing_address.country,
        zipcode: selected_client.billing_address.zipcode,
    } :
    {};
    return { initialValues };
})(ClientAddForm);

function mapStateToProps(state) {
    const { selected_client, pagination } = state.client;
    return { selected_client, pagination };
}

export default connect(mapStateToProps, actions)(ClientAdd);