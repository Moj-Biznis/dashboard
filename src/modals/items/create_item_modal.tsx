import { Button, Dialog, Flex, Switch, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { ItemDTO } from "../../shared/interfaces/item.interface";

interface CreateClientProps {
    cancelFunction: () => void,
    saveFunction: (form: ItemDTO) => void,
    isOpen: boolean,
    modalType:string
}


const CreateEmployeeModal = (props: CreateClientProps) => {
    const [form, setForm] = useState<ItemDTO>({
        id: "",
        name: "",
        price: "",
        selling_price: "",
        color: "",
        type: "service",
        duration: "60",
        note: "",
    });

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title> {`Create ${props.modalType}`}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                {`Create ${props.modalType}`}
                </Dialog.Description>

                <form action="">
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                                value={form.name}

                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Price
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })}
                                value={form.price}

                            />
                        </label>
                    </Flex>

                    <Flex direction="row" gap="3">

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Gender
                            </Text>
                            <select name="gender"
                                className="w-full rounded px-3 py-2 focus:outline-none "
                                onChange={(e) => setForm((c) => c && { ...c, gender: e.target.value })}
                                value={form.gender} id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Enable login
                            </Text>
                            <Switch

                                checked={form?.login_enabled}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, login_enabled: checked }))}
                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Input
                                required={true}
                                value={form.email}
                                onChange={(e) => setForm((c) => c && { ...c, email: e.target.value })}
                            />
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Note
                            </Text>
                            <TextField.Input
                                value={form.note}
                                onChange={(e) => setForm((c) => c && { ...c, note: e.target.value })}
                            />
                        </label>
                    </Flex>



                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={props.cancelFunction} variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="button" onClick={() => { props.saveFunction(form) }}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}

export default CreateEmployeeModal