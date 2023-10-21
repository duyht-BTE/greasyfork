require 'test_helper'

class MentionsUsersTest < ActiveSupport::TestCase
  include UserTextHelper

  def around(&)
    with_sphinx(&)
  end

  test 'updating references' do
    comment = create_comment('@"Gordon J. Canada", have you met @Geoffrey?')
    assert_equal ['Geoffrey', 'Gordon J. Canada'], comment.mentions.map { |m| m.user.name }.sort

    comment = create_comment('@"Junior J. Junior, Sr.", have you met @Geoffrey?', comment:)
    assert_equal ['Geoffrey', 'Junior J. Junior, Sr.'], comment.mentions.map { |m| m.user.name }.sort
  end

  def create_comment(text, comment: nil)
    if comment
      comment.text = text
    else
      discussion = discussions(:script_discussion)
      comment = discussion.comments.build(poster: users(:one), text_markup: 'markdown', text:)
    end

    comment.construct_mentions(detect_possible_mentions(comment.text, comment.text_markup))
    comment.save!
    comment
  end
end
