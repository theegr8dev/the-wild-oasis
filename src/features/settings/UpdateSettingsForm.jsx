import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxNumberOfGuestsPerBooking,
            breaskfastPrice,
        } = {},
    } = useSettings();
    const { isUpdating, updateSetting } = useUpdateSetting();
    if (isLoading) return <Spinner />;
    function handleUpdate(e, field) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [field]: value });
    }
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    defaultValue={minBookingLength}
                    onBlur={e => handleUpdate(e, 'minBookingLength')}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={e => handleUpdate(e, 'maxBookingLength')}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxNumberOfGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={e => handleUpdate(e, 'maxNumberOfGuestsPerBooking')}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breaskfastPrice}
                    disabled={isUpdating}
                    onBlur={e => handleUpdate(e, 'breaskfastPrice')}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
