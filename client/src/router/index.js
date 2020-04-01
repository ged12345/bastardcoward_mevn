import Vue from "vue";
import VueRouter from "vue-router";
import GameScreen from "@/components/GameScreen";
import Posts from "@/components/Posts";
import NewPost from "@/components/NewPost";
import EditPost from "@/components/EditPost";
import Actions from "@/components/Actions";
import NewAction from "@/components/NewAction";
import EditAction from "@/components/EditAction";
import ActionTypes from "@/components/ActionTypes";
import NewActionType from "@/components/NewActionType";
import EditActionType from "@/components/EditActionType";
import Locations from "@/components/Locations";
import NewLocation from "@/components/NewLocation";
import EditLocation from "@/components/EditLocation";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "GameScreen",
      component: GameScreen
    },
    {
      path: "/posts",
      name: "Posts",
      component: Posts
    },
    {
      path: "/posts/new",
      name: "NewPost",
      component: NewPost
    },
    {
      path: "/posts/:id",
      name: "EditPost",
      component: EditPost
    },
    {
      path: "/actions",
      name: "Actions",
      component: Actions
    },
    {
      path: "/actions/new",
      name: "NewAction",
      component: NewAction
    },
    {
      path: "/actions/:id",
      name: "EditAction",
      component: EditAction
    },
    {
      path: "/action_types",
      name: "ActionTypes",
      component: ActionTypes
    },
    {
      path: "/action_types/new",
      name: "NewActionType",
      component: NewActionType
    },
    {
      path: "/action_types/:id",
      name: "EditActionType",
      component: EditActionType
    },
    {
      path: "/locations",
      name: "Locations",
      component: Locations
    },
    {
      path: "/locations/new",
      name: "NewLocation",
      component: NewLocation
    },
    {
      path: "/locations/:id",
      name: "EditLocation",
      component: EditLocation
    }
  ],
  mode: "history"
});
