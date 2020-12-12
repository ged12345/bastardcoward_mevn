/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";
import GameScreen from "@/components/GameScreen";
/* import Posts from '@/components/Posts';
import NewPost from '@/components/NewPost';
import EditPost from '@/components/EditPost'; */
import Player from "@/components/Player";
import NewPlayer from "@/components/NewPlayer";
import EditPlayer from "@/components/EditPlayer";
import Actions from "@/components/Actions";
import NewAction from "@/components/NewAction";
import EditAction from "@/components/EditAction";
import ActionTypes from "@/components/ActionTypes";
import NewActionType from "@/components/NewActionType";
import EditActionType from "@/components/EditActionType";
import Locations from "@/components/Locations";
import NewLocation from "@/components/NewLocation";
import EditLocation from "@/components/EditLocation";
import Monsters from "@/components/Monsters";
import NewMonster from "@/components/NewMonster";
import EditMonster from "@/components/EditMonster";
import DamageTypes from "@/components/DamageTypes";
import NewDamageType from "@/components/NewDamageType";
import EditDamageType from "@/components/EditDamageType";
import Overview from "@/components/Overview";
import NotFoundPage from "@/components/NotFoundPage";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    /*
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    }, */
    {
      path: "/player",
      title: "Player",
      name: "Player",
      component: Player
    },
    {
      path: "/player/new",
      name: "NewPlayer",
      component: NewPlayer
    },
    {
      path: "/player/1",
      name: "EditPlayer",
      component: EditPlayer
    },
    {
      path: "/actions",
      title: "Actions",
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
      title: "Action Types",
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
      path: "/damage_types",
      title: "Damage Types",
      name: "DamageTypes",
      component: DamageTypes
    },
    {
      path: "/damage_types/new",
      name: "NewDamageType",
      component: NewDamageType
    },
    {
      path: "/damage_types/:id",
      name: "EditDamageType",
      component: EditDamageType
    },
    {
      path: "/locations",
      title: "Locations",
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
    },
    {
      path: "/monsters",
      title: "Monsters",
      name: "Monsters",
      component: Monsters
    },
    {
      path: "/monsters/new",
      name: "NewMonster",
      component: NewMonster
    },
    {
      path: "/monsters/:id",
      name: "EditMonster",
      component: EditMonster
    },
    {
      path: "/overview/",
      redirect: "/overview/locations"
    },
    {
      path: "/overview",
      name: "Overview",
      component: Overview,
      children: [
        {
          path: "player",
          title: "Player",
          name: "PlayerMenu",
          component: Player
        },
        {
          path: "actions",
          title: "Actions",
          name: "ActionsMenu",
          component: Actions
        },
        {
          path: "action_types",
          title: "Action Types",
          name: "ActionTypesMenu",
          component: ActionTypes
        },
        {
          path: "damage_types",
          title: "Damage Types",
          name: "DamageTypesMenu",
          component: DamageTypes
        },
        {
          path: "locations",
          title: "Locations",
          name: "LocationsMenu",
          component: Locations
        },
        {
          path: "monsters",
          title: "Monsters",
          name: "MonstersMenu",
          component: Monsters
        }
      ]
    },
    {
      path: "/:id",
      name: "GameScreen",
      component: GameScreen
    },
    {
      path: "/",
      name: "GameScreen",
      component: GameScreen
    },
    // Needs to be last element
    {
      path: "/**",
      name: "404",
      component: NotFoundPage
    }
  ],
  mode: "history"
});
