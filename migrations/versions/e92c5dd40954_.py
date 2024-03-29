"""empty message

Revision ID: e92c5dd40954
Revises: 7b6c81b8a874
Create Date: 2023-03-16 14:46:01.166093

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e92c5dd40954'
down_revision = '7b6c81b8a874'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.alter_column('commentreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.create_index(batch_op.f('ix_comment_commentreg'), ['commentreg'], unique=False)

    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.alter_column('contentreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.create_index(batch_op.f('ix_content_contentreg'), ['contentreg'], unique=False)

    with op.batch_alter_table('creators', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_creators_confirmed_on'), ['confirmed_on'], unique=False)

    with op.batch_alter_table('subscriber', schema=None) as batch_op:
        batch_op.alter_column('viewerreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.create_index(batch_op.f('ix_subscriber_viewerreg'), ['viewerreg'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subscriber', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_subscriber_viewerreg'))
        batch_op.alter_column('viewerreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    with op.batch_alter_table('creators', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_creators_confirmed_on'))

    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_content_contentreg'))
        batch_op.alter_column('contentreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_comment_commentreg'))
        batch_op.alter_column('commentreg',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    # ### end Alembic commands ###
