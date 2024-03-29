"""empty message

Revision ID: 5442d1f439c5
Revises: 09ce168a116c
Create Date: 2023-03-27 11:20:29.534766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5442d1f439c5'
down_revision = '09ce168a116c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.String(), nullable=True))
        batch_op.create_foreign_key(None, 'creators', ['author_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('author_id')

    # ### end Alembic commands ###
