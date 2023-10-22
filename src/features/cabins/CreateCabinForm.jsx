/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const isWorking = isCreating || isEditing;
    function onSubmit(data) {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: () => reset(),
                }
            );
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: () => reset(),
                }
            );
    }
    function onError(error) {
        console.log(error);
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapcity?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapcity"
                    {...register('maxCapcity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: value =>
                            value <= getValues().regularPrice ||
                            'Discount should be less than regular price',
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    disabled={isWorking}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession
                            ? false
                            : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? 'Edit cabin' : 'Create new cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
