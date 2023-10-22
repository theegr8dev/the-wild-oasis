import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase.from('Cabins').select('*');
    if (error) {
        console.log(error);
        throw new Error('Cabin could not be loaded');
    }
    return data;
}
export async function deleteCabin(id) {
    const { data, error } = await supabase.from('Cabins').delete().eq('id', id);
    if (error) {
        console.log(error);
        throw new Error('Cabin could not be deleted');
    }
    return data;
}
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        '/',
        ''
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. create cabin
    let query = supabase.from('Cabins');
    // A) Create
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    // B) Edit
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

    const { data, error } = await query.select().single();
    if (error) {
        console.log(error);
        throw new Error('Cabin could not be created');
    }
    // 2. upload image
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);
    // 3. Delete cabin if there was an error uploading image
    if (storageError) {
        await supabase.from('Cabins').delete().eq('id', data.id);
        console.log(error);
        throw new Error(
            'Cabin image could not be uploaded and cabin was not uploaded'
        );
    }
    return data;
}
