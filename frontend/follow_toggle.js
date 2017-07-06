const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data("user-id");
    this.followState = $el.data("initial-follow-state");
    this.render();
    this.$el.click((event) => this.handleClick(event));
  }

  render() {
    switch (this.followState) {
      case "Followed":
        this.$el.text("Unfollow!");
        this.$el.prop("disabled", false);
        break;
      case "Unfollowed":
        this.$el.text("Follow!");
        this.$el.prop("disabled", false);
        break;
      case "Following":
      this.$el.prop("disabled", true);
        this.$el.text("Following...");
        break;
      case "Unfollowing":
      this.$el.prop("disabled", true);
        this.$el.text("UnFollowing...");
        break;
      default:
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (this.followState === "Unfollowed") {
      this.followState = "Following";
      this.render();
      APIUtil.followUser(this.userId)
        .then(() => {
          this.followState = "Followed";
          this.render();
        });
    } else if (this.followState === "Followed") {
      this.followState = "Unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId)
        .then(() => {
          this.followState = "Unfollowed";
          this.render();
        });
    }
  }
}

module.exports = FollowToggle;
