import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import AddUserScreen from "./screens/AddUser";
import CreateProject from "./screens/CreateProject";
import Tasks from "./screens/Tasks";
import ProjectList from "./screens/ProjectList";
import UserTaskList from "./screens/UserTaskList";
import TasksDetails from "./screens/UserTaskDetails";
import ProjectDetails from "./screens/ProjectDetails";
import TaskListAdminView from "./screens/AdmTaskList";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen
          name="CreateProject"
          component={CreateProject}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetails}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="ProjectList"
          component={ProjectList}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="UserTaskList"
          component={UserTaskList}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="UserTaskDetails"
          component={TasksDetails}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="TaskListAdminView"
          component={TaskListAdminView}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Logout"
                color="#000"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
