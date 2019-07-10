import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormSelect } from '../formFields';

class UserAddForm extends Component {

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getUsers(`http://127.0.0.1:8000/api/users?page=${current_page}`)
        else
            this.props.getUsers();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    render() {
        const { className, handleSubmit, warehouse, role } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} user-add-form`}>
                <Field className='user-add-form__first_name' type='text' name='first_name' title='First Name' placeholder='First Name' component={FormInput} />
                <Field className='user-add-form__last_name' type='text' name='last_name' title='Last Name' placeholder='Last Name' component={FormInput} />
                <Field className='user-add-form__username' type='text' name='username' title='Username' placeholder='Username' component={FormInput} />
                <Field className='user-add-form__email' type='email' name='email' title='Email' placeholder='Email' component={FormInput} />
                <Field className='user-add-form__password' type='password' name='password' title='Password' placeholder='Password' component={FormInput} />
                <Field className='user-add-form__confirm' name='password' name='confirm' title='Confirm Password' placeholder='Confirm Password' component={FormInput} />
                <Field className='user-add-form__warehouse' name='warehouseID' title='Warehouse' placeholder='Select a Warehouse' options={warehouse} component={FormSelect}/>
                <Field className='user-add-form__role' name='roleID' title='Role' placeholder='Select a Role' options={role} component={FormSelect}/>
                <Field className='user-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class UserAdd extends Component {
    componentWillMount() {
        this.props.getWarehouses();
        this.props.getRoles();
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getUsers(`http://127.0.0.1:8000/api/users?page=${current_page}`)
        else
            this.props.getUsers();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        this.props.addUser(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                element.classList.remove('active');
                this.resetTable();
                this.resetActive();
            })
        });
    }

    render() {
        const warehousesSelect = this.props.warehouses.map(warehouse => {
            return {
                key: warehouse.id,
                value: warehouse.name
            }
        });
        
        const rolesSelect = this.props.roles.map(role => {
            return {
                key: role.id,
                value: role.role
            }
        });
        return (
            <div className={`user-add`}>
                <div className='user-add__background'></div>
                <div className='user-add__content'>
                    <Heading className='user-add__title'>Add User</Heading>
                    <UserAddForm onSubmit={(e) => this.onSubmit(e)} className='user-add__content__form' warehouse={warehousesSelect} role={rolesSelect} />
                </div>
            </div>
        )
    }
}

UserAddForm = reduxForm({
    form: 'user-add',
    enableReinitialize: true
})(UserAddForm);

UserAddForm = connect(state => {
    const { selected_user } = state.user;
    const initialValues = selected_user.id ? {
        id: selected_user.id,
        first_name: selected_user.first_name,
        last_name: selected_user.last_name,
        username: selected_user.username,
        email: selected_user.email,
        roleID: selected_user.roleID,
        warehouseID: selected_user.warehouseID
    } :
    {};
    return { initialValues };
})(UserAddForm);

function mapStateToProps(state) {
    const { selected_user, pagination } = state.user;
    const { warehouses } = state.warehouse;
    const { roles } = state.role;
    return { selected_user, pagination, warehouses, roles };
}

export default connect(mapStateToProps, actions)(UserAdd);