import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { API_URL, STORAGE_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormSelect, FormDecimal, FormImage } from '../formFields';
import { BackgroundImage } from '../common/image';
import { required } from '../formFieldsValidation';
import { notify } from '../common/general';
import FormError from '../common/formError';
import Icon from '../common/icon';

class ProductAddForm extends Component {

    removeImage = (id) => {
        this.props.removeProductImage(id, (productID) => {
            this.props.selectSingleProductFromDB(productID);
        });
    }    

    render() {
        const { className, handleSubmit, onAddImage, onRemoveImage, imageLength } = this.props;
        const { images } = this.props.initialValues;

        const weightOption = [
            {
                key: 'lb',
                value: 'Pounds (LB)'
            },
            {
                key: 'kg',
                value: 'Kilograms (KG)'
            }
        ]

        const longitudeOption = [
            {
                key: 'ft',
                value: 'Feets (FT)'
            },
            {
                key: 'm',
                value: 'Meters (M)'
            }
        ]

        return (
            <form onSubmit={handleSubmit} className={`${className} product-add-form`}>
                <Field className='product-add-form__name' type='text' name='name' title='Name' placeholder='Name' component={FormInput}  validate={[required]} />
                <Field className='product-add-form__price' type='text' name='price' title='Price' placeholder='Price' component={FormDecimal} icon='dollar-sign' validate={[required]} />
                <Field className='product-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormInput} validate={[required]} />
                <Field className='product-add-form__metric-weight' name='metric_weight' title='Metric Weight' placeholder='Select a metric weight' options={weightOption} component={FormSelect} />
                <Field className='product-add-form__weight' type='text' name='weight' title='Weight' placeholder='Weight' component={FormDecimal} />
                <Field className='product-add-form__metric-longitude' name='metric_longitude' title='Metric Longitude' placeholder='Select a metric longitude' options={longitudeOption} component={FormSelect} />
                <Field className='product-add-form__width' type='text' name='width' title='Width' placeholder='Width' component={FormDecimal}/>
                <Field className='product-add-form__height' type='text' name='height' title='Height' placeholder='Height' component={FormDecimal} />
                <Field className='product-add-form__length' type='text' name='length' title='Length' placeholder='Length' component={FormDecimal} />
                <Field className='product-add-form__image' name='image' title='Image' onAddImage={onAddImage} onRemoveImage={onRemoveImage} disabled={imageLength >= 4} component={FormImage} />
                <div className='product-add-form__uploaded-images'>
                    {   
                        images ?
                        images.map((image, index) => {
                            return (
                                <div key={index} className='product-add-form__uploaded-images__image-container'>
                                    <BackgroundImage className='product-add-form__uploaded-images__image-container__image' src={STORAGE_URL + image.path}/>
                                    <div className='product-add-form__uploaded-images__image-container__remove' onClick={() => this.removeImage(image.id)}><Icon icon='trash'/></div>
                                </div>
                            )
                        })
                        :
                        ""
                    }
                </div>
                <Field className='product-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class ProductAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formerr: [],
            images: []
        }
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getProducts(`${API_URL}/products?page=${current_page}`)
        else
            this.props.getProducts();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    unformatNumber(number) {
        if (typeof number == 'number')
            number = number.toString();

        while (number.indexOf(",") != -1) {
            number = number.replace(',', '');
        }
        return number;
    }

    onAddImage = (file) => {
        if(this.state.images)
            this.setState({images: [...this.state.images, file]});
        else
            this.setState({images: [file]});
    }

    onRemoveImage = (file) => {
        let images = this.state.images.filter(image => file != image);
        this.setState({images: images});
    }

    uploadImage = (response, success) => {
        let images;
        
        if(this.state.images)
            images = this.state.images;
        
        images.forEach((image, index) => {
            let imageFields = {
                id: response.data.id,
                index: index,
                image: image
            }

            this.props.uploadProductImage(imageFields, (response) => {
                // TODO: Real upload message goes here
            })

        });
        
        success();
    }

    onSubmit = (fields) => {
        fields.price = this.unformatNumber(fields.price);
        fields.weight = fields.weight ? this.unformatNumber(fields.weight) : fields.weight;
        fields.width = fields.width ? this.unformatNumber(fields.width) : fields.width;
        fields.height = fields.height ? this.unformatNumber(fields.height) : fields.height;
        fields.length = fields.length ? this.unformatNumber(fields.length) : fields.length;

        this.props.addProduct(fields, (response) => {
            this.uploadImage(response, () => {
                notify('success', 'The product has been added successfully');

                document.querySelectorAll('.modal').forEach((element) => {
                    element.classList.remove('active');
                });

                this.resetTable();
                this.resetActive();
            });
        },
        (res) => {
            this.setState({formerr: res.name})
        });
    }

    render() {
        const imageLength = this.state.images.length;
        return (
            <div className={`product-add`}>
                <div className='product-add__background'></div>
                <div className='product-add__content'>
                    <Heading className='product-add__content__title'>Add Product</Heading>
                    {   
                        this.state.formerr.map(message => {
                            return <FormError className='product-add__content__form-err'>{message}</FormError>
                        })
                    }
                    <ProductAddForm onSubmit={(e) => this.onSubmit(e)} onAddImage={this.onAddImage} onRemoveImage={this.onRemoveImage} imageLength={imageLength} className='product-add__content__form' />
                </div>
            </div>
        )
    }
}


ProductAddForm = reduxForm({
    form: 'product-add',
    enableReinitialize: true
})(ProductAddForm);

ProductAddForm = connect((state) => {
    const { selected_product, pagination } = state.product;
    return { initialValues: selected_product, pagination };
}, actions)(ProductAddForm);

function mapStateToProps(state) {
    const { selected_product, pagination } = state.product;
    return { selected_product, pagination };
}

export default connect(mapStateToProps, actions)(ProductAdd);