import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormButton, FormSelect } from '../formFields';
import { notify } from '../common/general';


class OrderAssignUserForm extends Component {

    componentWillMount() {
        this.props.getUsers();
    }

    render() {
        const { className, handleSubmit } = this.props;
        let usersOption = this.props.users.map((user) => {
            return {
                key: user.id,
                value: `${user.first_name} ${user.last_name}`
            }
        })
        return (
            <form onSubmit={handleSubmit} className={`${className} order-assign-user-form`}>
                <Field className='order-assign-user-form__user' name='userID' title='User' placeholder='Select a User' component={FormSelect} options={usersOption} />

                <Field className='order-assign-user-form__submit' type='submit' name='submit' title='Assign User' onClick={() => console.log('Submiting Client')} component={FormButton}/>
            </form>
        )
    }
}

class OrderAssignUser extends Component {

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getOrdersPerStatus(3, `${API_URL}/orders?page=${current_page}`);
        else
            this.props.getOrdersPerStatus(3);
    }

    onSubmit = (fields) => {
        console.log("Fields to submit: " , fields);
        this.props.assignUser(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                notify('success', 'The user was assigned to the order successfully');
                element.classList.remove('active');
                this.resetTable();
            })
        });
    }

    render() {
        return (
            <div className='order-assign-user'>
                <div className='order-assign-user__background'></div>
                <div className='order-assign-user__content'>
                    <Heading className="order-assign-user__heading">Assign User</Heading>
                    <OrderAssignUserForm onSubmit={(e) => this.onSubmit(e)} className='order-assign-user__content__form' />
                </div>
            </div>
        )
    }
}

OrderAssignUserForm = reduxForm({
    form: 'order-assign-user',
    enableReinitialize: true
})(OrderAssignUserForm);


OrderAssignUserForm = connect(state => {
    const { selected_order } = state.order;
    const { users } = state.user;
    const initialValues = {
        orderID: selected_order.id
    };
    return { initialValues, users };
}, actions)(OrderAssignUserForm);

function mapStateToProps(state) {
    const { selected_order, pagination } = state.order;
    return { selected_order, pagination };
}

export default connect(mapStateToProps, actions)(OrderAssignUser);