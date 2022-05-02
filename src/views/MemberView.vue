<template>
  <div class="memberView" v-if="profiles.length > 0">
    <h3>List a member</h3>
    <div class="contentLayout col-xs-12 col-sm-2 col-md-2">
      <div class="layoutWrap">
        <h5>Location</h5>
        <div
          class="form-check"
          :class="idx >= 5 && !viewMore ? 'hideChks' : ''"
          v-for="(profile, idx) in profiles"
          :key="'filter_' + profile.id"
        >
          <input
            v-if="idx < 5 || viewMore"
            class="form-check-input"
            type="checkbox"
            :value="profile.address.city"
            @change="filterCity($event)"
            :id="'chk_' + profile.id"
          />
          <label
            v-if="idx < 5 || viewMore"
            :class="idx >= 5 && !viewMore ? 'hideChks' : ''"
            class="form-check-label"
            :for="'chk_' + profile.id"
          >
            {{ profile.address.city }}
          </label>
        </div>
        <p class="viewMore" @click="viewMore = !viewMore">
          {{ viewMore ? "View Less" : "View More" }}
        </p>
      </div>
    </div>
    <div class="contentLayout col-xs-12 col-sm-9 col-md-9">
      <div class="layoutWrap controlPanel">
        <span
          >showing {{ pageOfItems.length }} out of
          {{ profiles.length }} items</span
        >
        <div class="orderFilter">
          <span>Order By: </span>
          <select
            class="form-select"
            aria-label="Default select example"
            @change="orderBySelection"
          >
            <option selected value="name">Name</option>
            <option value="street">Street</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>
    </div>
    <div class="contentLayout col-xs-12 col-sm-9 col-md-9">
      <ul class="memberList">
        <li
          v-for="profile in pageOfItems"
          :key="profile.id"
          class="col-xs-12 col-sm-4 col-md-4"
        >
          <div class="members">
            <div class="img"></div>
            <p class="profileName">{{ profile.name }}</p>
            <p class="profileEmail">{{ profile.email }}</p>
            <p class="profileAddress">
              {{ profile.address.suite }}, {{ profile.address.street }}
            </p>
            <p class="profileCity">
              {{ profile.address.city }} - {{ profile.address.zipcode }}
            </p>
          </div>
        </li>
      </ul>
      <div class="paginationWrap">
        <jw-pagination
          :items="filteredProfiles"
          @changePage="onChangePage"
          :pageSize="pageLength"
          :styles="customStyles"
          :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
  </div>
  <div v-else>
    <page-loader :loading="isLoading"></page-loader>
  </div>
</template>

<script>
import JwPagination from "jw-vue-pagination";
import PageLoader from "../components/PageLoader.vue";

const customLabels = {
    first: '',
    last: '',
    previous: '<',
    next: '>'
};

const customStyles = {
    li: {
        display: 'inline-block',
        border: 'none'
    },
    a: {
        border: 'none',
        color:'#a1a1a1',
        borderRadius: '0',
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0px 7px',
        padding:'4px 6px',
        backgroundColor: 'transparent'
    }
    
};

export default {
  components: {
    JwPagination,
    PageLoader,
  },
  data() {
    return {
      profiles: [],
      pageOfItems: [],
      pageLength: 6,
      searchTerm: "",
      mode: "name",
      sortMode: "name",
      viewMore: false,
      isLoading: false,
      customStyles,
      customLabels
    };
  },
  computed: {
    filteredProfiles() {
      var self = this;
      if (this.searchTerm) {
        return this.profiles.filter((el) => {
          let currEl = el.name.toLowerCase();
          if (this.mode === "city") {
            currEl = el.address.city.toLowerCase();
          }
          const searchTerm = this.searchTerm.toLowerCase();
          return currEl.includes(searchTerm);
        });
      } else {
        return this.profiles.slice().sort(function (a, b) {
          if (self.sortMode === "street") {
            return a.address.street > b.address.street ? 1 : -1;
          } else if (self.sortMode === "city") {
            return a.address.city > b.address.city ? 1 : -1;
          } else {
            return a.name > b.name ? 1 : -1;
          }
        });
      }
    },
  },
  created() {
    var self = this;
    self.isLoading = true;
    self.$store.dispatch("fetchProfiles").then(() => {
      self.profiles = self.$store.state.userProfiles;
      self.isLoading = false;
    });
    this.$emitter.$on("searchEvent", (searchTerm) => {
      this.searchTerm = searchTerm;
    });
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    filterCity($event) {
      if ($event.target.checked) {
        this.mode = "city";
        this.searchTerm = $event.target.value;
      } else {
        this.mode = "name";
        this.searchTerm = "";
      }
    },
    orderBySelection($event) {
      let orderCriteria = $event.target.value;
      this.sortMode = orderCriteria;
      this.searchTerm = "";
    },
  },
};
</script>