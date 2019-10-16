import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading, SmallHeading } from '../common/headings';
import { FormButton, FormSelect, FormQuantity } from '../formFields';
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
        const { className, handleSubmit, sections, aisles, columns, rows } = this.props;
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
            <form onSubmit={handleSubmit} className={`${className} location-item-add-form`}>
                <Field className='location-item-add-form__section' name='sectionID' title='Section' placeholder='Select a Section' component={FormSelect} options={sectionsOption} onChangeEvent={this.getAislesItem} />
                <Field className='location-item-add-form__aisle' name='aisleID' title='Aisle' placeholder='Select a Aisle' component={FormSelect} options={aislesOption} onChangeEvent={this.getColumnsItem} />
                <Field className='location-item-add-form__column' name='columnID' title='Column' placeholder='Select a Column' component={FormSelect} options={columnsOption} onChangeEvent={this.getRowsItem} />
                <Field className='location-item-add-form__row' name='rowID' title='Row' placeholder='Select a Row' component={FormSelect} options={rowsOption} />
                <Field className='location-item-add-form__stock' min="0" max="99" name='stock' title='Stock' placeholder='Stock' component={FormQuantity} />
                <Field className='location-item-add-form__submit' type='submit' name='submit' title='Add To location' component={FormButton}/>
            </form>
        )
    }
}

class LocationItemAdd extends Component {
    resetTable() {
        const { id } = this.props.selected_warehouse;
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getStockPerWarehouse(id, `${API_URL}/stock?page=${current_page}`)
        else
            this.props.getStockPerWarehouse(id);
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        if(fields.stock >= 0 && fields.stock <= this.props.selected_stock.unassigned){
            this.props.addItemToLocation(fields, (res) => {
                document.querySelectorAll('.modal').forEach((element) => {
                    element.classList.remove('active');
                    this.resetTable();
                    this.resetActive();
                })
            });
            notify('success', 'The locations has been added in the warehouse successfully');
        }
        else {
            notify('error', "The amount of items is bigger than the one available ("+ this.props.selected_stock.unassigned +" available)");
        }
    }

    render() {
        return (
            <div className='location-item-add'>
                <div className='location-item-add__background'></div>
                <div className='location-item-add__content'>
                    <div className='location-item-add__content__header'>
                        <Heading className='location-item-add__content__header__title'>Add Item to Location</Heading>
                        <SmallHeading size="small" className="location-item-add__content__header__subheading">{this.props.selected_stock.product ? this.props.selected_stock.product.name : ""}</SmallHeading>
                    </div>
                    <LocationItemAddForm onSubmit={(e) => this.onSubmit(e)} className='location-item-add__content__form' warehouse={this.props.warehouseID}/>
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
    const { selected_warehouse, selected_stock } = state.warehouse;
    const { sections, aisles, columns, rows } = state.location;
    const initialValues = {
        warehouseID: selected_warehouse.id,
        product_warehouseID: selected_stock.id
    };
    return { initialValues, selected_warehouse, sections, aisles, columns, rows };
}, actions)(LocationItemAddForm)

function mapStateTopProps(state){
    const { selected_stock, selected_warehouse, pagination } = state.warehouse;
    return { selected_stock, selected_warehouse, pagination }
}

export default connect(mapStateTopProps, actions)(LocationItemAdd);