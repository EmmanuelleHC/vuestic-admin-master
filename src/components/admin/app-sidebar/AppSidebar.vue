<template>
  <aside
    class="app-sidebar"
    :class="computedClass"
    :style="computedStyle"
  >
    <ul class="app-sidebar__menu">
      <template v-for="(item, key) in items">
        <app-sidebar-link-group
          :key="key"
          :minimized="minimized"
          :icon="item.meta && item.meta.iconClass"
          v-if="item.children"
          :title="$t(item.displayName)"
          :children="item.children"
          :active-by-default="hasActiveByDefault(item)"
        >
          <app-sidebar-link
            v-for="(subMenuItem, key) in item.children"
            :key="key"
            :to="{ name: subMenuItem.name }"
            :title="$t(subMenuItem.displayName)"
          />
        </app-sidebar-link-group>
        <app-sidebar-link
          v-else
          :key="key"
          :minimized="minimized"
          :active-by-default="item.name === $route.name"
          :icon="item.meta && item.meta.iconClass"
          :to="{ name: item.name }"
          :title="$t(item.displayName)"
        />
      </template>
    </ul>
  </aside>
</template>

<script>
// import { navigationRoutes } from './NavigationRoutes'
import AppSidebarLink from './components/AppSidebarLink'
import AppSidebarLinkGroup from './components/AppSidebarLinkGroup'
import { ColorThemeMixin } from '../../../services/vuestic-ui'

import axios from 'axios'
export default {
  name: 'app-sidebar',
  inject: ['contextConfig'],
  components: {
    AppSidebarLink,
    AppSidebarLinkGroup,
  },
  mixins: [ColorThemeMixin],
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  data () {
    return {
      items: [],
      // items: navigationRoutes.routes,
    }
  },
  mounted () {
    this.loadMenu()
  },
  computed: {
    computedClass () {
      return {
        'app-sidebar--minimized': this.minimized,
      }
    },
    computedStyle () {
      return {
        backgroundColor: this.contextConfig.invertedColor ? '  #DDECEF' : this.colorComputed,
      }
    },
  },
  methods: {
    hasActiveByDefault (item) {
      return item.children.some(child => child.name === this.$route.name)
    },
    loadMenu: function () {
      axios({
        method: 'post',
        url: 'http://localhost:8000/get_menu/',
        data: {
          resp_id: this.$session.get('resp_id'),
          token: this.$session.get('token'),
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.data = response.data
          this.data.forEach(item => {
            this.items.push(item)
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
}

</script>

<style lang="scss">
.app-sidebar {
  overflow: auto;
  display: flex;
  max-height: 100%;
  flex: 0 0 16rem;

  @include media-breakpoint-down(sm) {
    flex: 0 0 100%;
  }

  &--minimized {
    flex: 0 0 3.25rem;
  }

  &__menu {
    margin-bottom: 0;
    padding-top: 2.5625rem;
    padding-bottom: 2.5rem;
    list-style: none;
    padding-left: 0;
    width: 100%;
  }
}
</style>
