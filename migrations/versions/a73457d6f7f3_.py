"""empty message

Revision ID: a73457d6f7f3
Revises: e8d70b29da49
Create Date: 2023-03-31 07:59:59.972578

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a73457d6f7f3'
down_revision = 'e8d70b29da49'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('viewed_pages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('viewreg', sa.DateTime(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('viewed_pages', schema=None) as batch_op:
        batch_op.drop_column('viewreg')

    # ### end Alembic commands ###
