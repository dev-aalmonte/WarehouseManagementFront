import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton } from '../formFields';


class ClientAddForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} client-add-form`}>
                <Field className='client-add-form__first-name' type='text' name='first_name' title='First Name' placeholder='First Name' component={FormInput} />
                <Field className='client-add-form__last-name' type='text' name='last_name' title='Last Name' placeholder='Last Name' component={FormInput} />
                <Field className='client-add-form__email' type='text' name='email' title='Email' placeholder='Email' component={FormInput} />
                <Field className='client-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormInput} />
                
                <Field className='client-add-form__street-address' type='text' name='street_address' title='Street Address' placeholder='Street Address' component={FormInput} />
                <Field className='client-add-form__extra-address' type='text' name='extra_address' title='Secondary' placeholder='Extra address information' component={FormInput} />
                <Field className='client-add-form__city' name='city' title='City' placeholder='City' component={FormInput} />
                <Field className='client-add-form__state' type='text' name='state' title='State' placeholder='State' component={FormInput} />
                <Field className='client-add-form__country' name='country' title='Country' placeholder='Country' component={FormInput} />
                <Field className='client-add-form__zipcode' type='text' name='zipcode' title='Zip Code' placeholder='Zip Code' component={FormInput}/>

                <Field className='client-add-form__submit' type='submit' name='submit' title='Add Client' onClick={() => console.log('Submiting Client')} component={FormButton}/>
            </form>
        )
    }
}

class ClientAdd extends Component {

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getClients(`${API_URL}/clients?page=${current_page}`)
        else
            this.props.getClients();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        this.props.addClient(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                element.classList.remove('active');
                this.resetTable();
                this.resetActive();
            })
        });
    }

    render() {
        return (
            <div className='client-add'>
                <div className='client-add__background'></div>
                <div className='client-add__content'>
                    <Heading className="client-add__heading">Add Client</Heading>
                    <ClientAddForm onSubmit={(e) => this.onSubmit(e)} className='client-add__content__form' />
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
    const initialValues = selected_client.id ? {
        id: selected_client.id,
        first_name: selected_client.first_name,
        last_name: selected_client.last_name,
        email: selected_client.email,
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