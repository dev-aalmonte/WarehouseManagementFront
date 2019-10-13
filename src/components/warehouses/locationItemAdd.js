import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading, SmallHeading } from '../common/headings';
import { FormInput, FormButton, FormList, FormSelect, FormQuantity } from '../formFields';
import { notify } from '../common/general';

class LocationItemAddForm extends Component {

    componentWillMount() {
        if(this.props.warehouse)
            this.props.getSectionByWarehouse(this.props.warehouse);
    }

    componentWillUpdate() {
        if(this.props.warehouse)
            this.props.getSectionByWarehouse(this.props.warehouse);
    }

    getAislesItem = (sectionID) => {
        this.props.getAisleBySection(sectionID);
    }

    getColumnsItem = (aisleID) => {
        this.props.getColumnByAisle(aisleID);
    }

    getRowsItem = (columnID) => {
        this.props.getRowByColumn(columnID);
    }

    render() {
        const { className, handleSubmit, onKeyPress, sections, aisles, columns, rows } = this.props;
        let sectionsOption = sections.map((section) => {
            return {
                key: section.id,
                value: section.code
            }
        })
        let aislesOption = aisles.map((aisle) => {
            return {
                key: aisle.id,
                value: aisle.number
            }
        })
        let columnsOption = columns.map((column) => {
            return {
                key: column.id,
                value: column.number
            }
        })
        let rowsOption = rows.map((row) => {
            return {
                key: row.id,
                value: row.number
            }
        })
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} location-item-add-form`}>
                <Field className='location-item-add-form__section' name='sectionID' title='Section' placeholder='Select a Section' component={FormSelect} options={sectionsOption} onChangeEvent={this.getAislesItem} />
                <Field className='location-item-add-form__aisle' name='aisleID' title='Aisle' placeholder='Select a Aisle' component={FormSelect} options={aislesOption} onChangeEvent={this.getColumnsItem} />
                <Field className='location-item-add-form__column' name='columnID' title='Column' placeholder='Select a Column' component={FormSelect} options={columnsOption} onChangeEvent={this.getRowsItem} />
                <Field className='location-item-add-form__row' name='rowID' title='Row' placeholder='Select a Row' component={FormSelect} options={rowsOption} />
                <Field className='location-item-add-form__submit' type='submit' name='submit' title='Add To location' component={FormButton}/>
            </form>
        )
    }
}

class LocationItemAdd extends Component {
    render() {
        console.log("Warehouse: ", this.props.warehouseID);
        return (
            <div className='location-item-add'>
                <div className='location-item-add__background'></div>
                <div className='location-item-add__content'>
                    <div className='location-item-add__content__header'>
                        <Heading className='location-item-add__content__header__title'>Add Item to Location</Heading>
                        <SmallHeading size="small" className="location-item-add__content__header__subheading">{this.props.selected_stock.product ? this.props.selected_stock.product.name : ""}</SmallHeading>
                    </div>
                    <LocationItemAddForm onSubmit={(e) => this.onSubmit(e)} onKeyPress={this.onKeyPress} className='location-item-add__content__form' warehouse={this.props.warehouseID}/>
                </div>
            </div>
        )
    }
}

LocationItemAddForm = reduxForm({
    form: 'location-item-add',
    enableReinitialize: true
})(LocationItemAddForm);

LocationItemAddForm = connect(state => {
    const { selected_warehouse } = state.warehouse;
    const { sections, aisles, columns, rows } = state.location;
    const initialValues = {
        warehouseID: selected_warehouse.id
    };
    return { initialValues, selected_warehouse, sections, aisles, columns, rows };
}, actions)(LocationItemAddForm)

function mapStateTopProps(state){
    const { selected_stock, selected_warehouse } = state.warehouse;
    return { selected_stock, selected_warehouse }
}

export default connect(mapStateTopProps, actions)(LocationItemAdd);