"""creators table

Revision ID: bed88290ec4e
Revises: 0ec3c48d0a46
Create Date: 2023-03-16 21:04:57.562461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bed88290ec4e'
down_revision = '0ec3c48d0a46'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('creators', schema=None) as batch_op:
        batch_op.add_column(sa.Column('admin', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('creators', schema=None) as batch_op:
        batch_op.drop_column('admin')

    # ### end Alembic commands ###