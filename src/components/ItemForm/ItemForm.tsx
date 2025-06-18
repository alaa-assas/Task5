import { Col, Form, Row } from "react-bootstrap";
import ImageUploadBox from "../ImageUploadBox/ImageUploadBox";
import "./ItemForm.css";
import BackBtn from "../BackBtn/BackBtn";
import {type RefObject} from 'react'
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import type { ItemError } from "../../types/ItemError";
import BtnCustom from "../BtnCustom/BtnCustom";

type AddEditType = {
    label: string;
    placeholder: string;
    type: string;
    controlId: string;
    ref: RefObject<HTMLInputElement>;
    defaultValue?: string;
    errorKey: string,
};

type AddEditProps = {
    error?: ItemError
    addItemData: AddEditType[];
    onSubmit: (e: React.FormEvent) => void;
    image: RefObject<HTMLInputElement>;
    title: string;
      initialImage?: string; 

};

const ItemForm = ({ error ,addItemData, onSubmit, image, title, initialImage }: AddEditProps) => {
    
    return (
        <div className="formWrapper container-lg">
            <BackBtn to="/home/items" />
            <h2 className="formTitle fw-semibold fs-60">{title}</h2>
            <Form onSubmit={onSubmit}>
                <div className="d-flex gap-5 align-items-start flex-wrap flex-lg-nowrap ">
                    <div className="d-flex flex-column formFields flex-fill">
                        {addItemData.map((data, index) => (
                            <InputFiledCustom
                                key={index}
                                controlId={data.controlId} 
                                type={data.type}
                                placeholder={data.placeholder}
                                ref={data.ref}
                                label={data.label}
                                classExtraLabel="pb-3 fs-1 mb-0"
                                classExtraInput="rounded-1"
                                defaultValue={data.defaultValue}
                            >
                                {error?.[data.errorKey as keyof ItemError] && (
                                    <p className="text-danger mb-0 fs-14">{error?.[data.errorKey as keyof ItemError]?.[0]}</p>
                                )}
                          </InputFiledCustom>
                        ))}
                    </div>

                    <div className="flex-fill">
                        <Form.Label className="label-image pb-3 fw-medium text-grey lh-1 ls-normal fs-1 mb-0">Image</Form.Label>
                        <ImageUploadBox
                            ref={image}
                            addNewItem="imageBox rounded-1"
                            initialImage={initialImage} 
                        />
                        {error?.image && <p className="text-danger mb-0 fs-14">{error.image[0]}</p>}
                    </div>
                </div>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <BtnCustom name={"Save"} classExtra="p-3 fs-2 submitBtn mb-4" size="lg" type="submit" />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ItemForm;
