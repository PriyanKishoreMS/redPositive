import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	Image,
	TextInput,
	ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import { useState } from "react";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { postForm } from "../slices/formSlice";
const complete = require("../assets/complete.png");

const FormScreen = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [error, setError] = useState(false);

	const dispatch = useDispatch();

	const checkForm = () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		const phoneRegex = /^[0-9]{10}$/;
		if (
			form.name.length > 0 &&
			emailRegex.test(form.email) &&
			phoneRegex.test(form.phone) &&
			form.message.length > 0
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleSubmit = () => {
		if (checkForm() == true) {
			setError(false);
			setLoading(true);
			dispatch(postForm(form)).then(() => {
				setLoading(false);
				setCompleted(true);
				setForm({
					name: "",
					email: "",
					phone: "",
					message: "",
				});
			});
		} else {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 5000);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={tw`bg-gray-100 h-full`}>
				<KeyboardAvoidingView behavior='padding' style={tw`flex-1`} enabled>
					<View
						style={tw`p-5 flex-row justify-between items-center bg-gray-200 shadow-lg`}
					>
						<TouchableOpacity style={tw`flex-row items-center`}>
							<Text style={tw`text-2xl font-normal mr-2 text-red-500`}>
								Red
							</Text>
							<Text style={tw`text-2xl font-bold`}>+ve</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`border-2 rounded-full p-0.5 border-red-500`}
						>
							<Image
								source={{
									uri: "https://avatars.githubusercontent.com/u/80768547?v=4",
								}}
								style={tw`w-7 h-7 rounded-full`}
							/>
						</TouchableOpacity>
					</View>
					<View style={tw`p-5`}>
						<Text style={tw`text-2xl font-bold`}>Connect with Us</Text>
						<Text style={tw`text-gray-500 mt-2`}>
							We are here to help you. Please fill the form below and we will
							reach out to you.
						</Text>
						{completed ? (
							<View style={tw`mt-5 items-center`}>
								<Image source={complete} style={tw`w-32 h-32 mx-auto`} />
								<Text style={tw`text-center text-gray-500 font-bold mt-2`}>
									Thank you for your submission. We will get back to you soon.
								</Text>
								<TouchableOpacity
									style={tw`bg-red-500 mt-5 py-2 w-1/2 rounded-lg`}
									onPress={() => setCompleted(false)}
								>
									<Text style={tw`text-white font-bold text-center`}>
										Submit Another
									</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View style={tw`mt-5`}>
								<Text style={tw`text-gray-600`}>Name</Text>
								<TextInput
									style={tw`border-b border-gray-300 bg-white rounded-md p-2 mt-1 shadow-md py-2`}
									//placeholder funny name
									placeholder='Brad Pitt'
									value={form.name}
									onChangeText={text => setForm({ ...form, name: text })}
								/>
								<Text style={tw`text-gray-600 mt-5`}>Email</Text>
								<TextInput
									style={tw`border-b border-gray-300 bg-white rounded-md p-2 mt-1 shadow-md py-2`}
									placeholder='brad@fightclub.com'
									value={form.email}
									onChangeText={text => setForm({ ...form, email: text })}
								/>
								<Text style={tw`text-gray-600 mt-5`}>Phone</Text>
								<TextInput
									style={tw`border-b border-gray-300 bg-white rounded-md p-2 mt-1 shadow-md py-2`}
									placeholder='+91 1234567890'
									value={form.phone}
									keyboardType='phone-pad'
									onChangeText={text => setForm({ ...form, phone: text })}
								/>
								<Text style={tw`text-gray-600 mt-5`}>Message</Text>
								<TextInput
									style={tw`border-b border-gray-300 bg-white rounded-md p-2 mt-1 shadow-md py-2`}
									placeholder='The first rule of Fight Club is...'
									value={form.message}
									multiline={true}
									onChangeText={text => setForm({ ...form, message: text })}
								/>
								{error ? (
									<Text style={tw`text-red-500 text-sm mt-2`}>
										Please fill all the fields appropriately
									</Text>
								) : (
									""
								)}
								<TouchableOpacity
									style={tw`bg-red-500 mt-10 py-3 rounded-lg`}
									onPress={() => handleSubmit()}
								>
									{loading ? (
										<ActivityIndicator color='white' />
									) : (
										<Text style={tw`text-white font-bold text-center`}>
											Submit
										</Text>
									)}
								</TouchableOpacity>
							</View>
						)}
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
});

export default FormScreen;
